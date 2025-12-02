#!/usr/bin/env python3
"""
Flask API for Accessibility Checker
Provides REST API endpoints for web accessibility auditing
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse
import sys

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

def check_images(soup):
    """Check for images without alt text"""
    issues = []
    images = soup.find_all('img')
    
    for img in images:
        if not img.get('alt') or img.get('alt').strip() == '':
            src = img.get('src', 'unknown')
            issues.append({
                'type': 'image',
                'severity': 'critical',
                'message': f'Image missing alt text: {src[:100]}'
            })
    
    return issues

def check_buttons(soup):
    """Check for buttons without accessible labels"""
    issues = []
    buttons = soup.find_all('button')
    
    for button in buttons:
        has_text = button.get_text(strip=True)
        has_aria_label = button.get('aria-label')
        has_aria_labelledby = button.get('aria-labelledby')
        
        if not (has_text or has_aria_label or has_aria_labelledby):
            issues.append({
                'type': 'button',
                'severity': 'critical',
                'message': 'Button without accessible label found'
            })
    
    return issues

def check_links(soup):
    """Check for links with vague text"""
    issues = []
    vague_texts = ['click here', 'read more', 'here', 'more', 'link']
    links = soup.find_all('a')
    
    for link in links:
        link_text = link.get_text(strip=True).lower()
        if link_text in vague_texts:
            issues.append({
                'type': 'link',
                'severity': 'warning',
                'message': f'Link with vague text: "{link_text}"'
            })
    
    return issues

def check_form_labels(soup):
    """Check for form inputs without labels"""
    issues = []
    passed = []
    inputs = soup.find_all(['input', 'textarea', 'select'])
    
    for input_elem in inputs:
        input_type = input_elem.get('type', 'text')
        if input_type in ['hidden', 'submit', 'button']:
            continue
            
        input_id = input_elem.get('id')
        has_label = False
        
        if input_id:
            label = soup.find('label', {'for': input_id})
            if label:
                has_label = True
                passed.append({
                    'type': 'form',
                    'message': 'Form label properly associated'
                })
        
        has_aria_label = input_elem.get('aria-label')
        has_aria_labelledby = input_elem.get('aria-labelledby')
        
        if not (has_label or has_aria_label or has_aria_labelledby):
            issues.append({
                'type': 'form',
                'severity': 'critical',
                'message': 'Form input without associated label'
            })
    
    return issues, passed

def check_headings(soup):
    """Check for semantic heading structure"""
    headings = soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
    
    if len(headings) > 0:
        return [], [{'type': 'heading', 'message': f'Found {len(headings)} semantic headings'}]
    else:
        return [{'type': 'heading', 'severity': 'warning', 'message': 'No semantic headings found'}], []

def check_language(soup):
    """Check for language attribute"""
    html_tag = soup.find('html')
    
    if html_tag and html_tag.get('lang'):
        return [], [{'type': 'language', 'message': 'Page language attribute set'}]
    else:
        return [{'type': 'language', 'severity': 'warning', 'message': 'Missing language attribute'}], []

def calculate_score(critical_count, warning_count, passed_count):
    """Calculate accessibility score"""
    total_checks = critical_count + warning_count + passed_count
    if total_checks == 0:
        return 0.0
    
    # Critical issues heavily impact score
    score = 10.0
    score -= (critical_count * 2.0)
    score -= (warning_count * 0.5)
    
    return max(0.0, min(10.0, score))

@app.route('/api/check', methods=['POST'])
def check_accessibility():
    """Main API endpoint for accessibility checking"""
    try:
        data = request.get_json()
        url = data.get('url')
        
        if not url:
            return jsonify({'error': 'URL is required'}), 400
        
        # Add protocol if missing
        if not url.startswith(('http://', 'https://')):
            url = 'https://' + url
        
        # Fetch the webpage
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        # Parse HTML
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Run all checks
        all_issues = []
        all_passed = []
        
        all_issues.extend(check_images(soup))
        all_issues.extend(check_buttons(soup))
        all_issues.extend(check_links(soup))
        
        form_issues, form_passed = check_form_labels(soup)
        all_issues.extend(form_issues)
        all_passed.extend(form_passed)
        
        heading_issues, heading_passed = check_headings(soup)
        all_issues.extend(heading_issues)
        all_passed.extend(heading_passed)
        
        lang_issues, lang_passed = check_language(soup)
        all_issues.extend(lang_issues)
        all_passed.extend(lang_passed)
        
        # Categorize issues
        critical_issues = [i for i in all_issues if i.get('severity') == 'critical']
        warnings = [i for i in all_issues if i.get('severity') == 'warning']
        
        # Calculate score
        score = calculate_score(len(critical_issues), len(warnings), len(all_passed))
        
        # Build response
        result = {
            'url': url,
            'score': round(score, 1),
            'summary': {
                'critical': len(critical_issues),
                'warnings': len(warnings),
                'passed': len(all_passed)
            },
            'issues': {
                'critical': critical_issues[:10],  # Limit to 10 for display
                'warnings': warnings[:10]
            },
            'passed': all_passed[:10]
        }
        
        return jsonify(result), 200
        
    except requests.exceptions.RequestException as e:
        return jsonify({'error': f'Failed to fetch URL: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

@app.route('/')
def index():
    """Root endpoint"""
    return jsonify({'message': 'Accessibility Checker API', 'status': 'running'}), 200

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)

