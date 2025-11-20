from flask import Blueprint, request, jsonify
from models import db, Post
from datetime import datetime
from sqlalchemy import or_, asc, desc

posts_bp = Blueprint('posts', __name__)

@posts_bp.route('/posts', methods=['GET'])
def get_posts():
    """Get all posts, with optional search and sorting"""
    try:
        # Base query
        query = Post.query

        # Search filtering
        search_term = request.args.get('q', '', type=str).strip()
        if search_term:
            if len(search_term) > 100:
                return jsonify({'error': 'Search term must be 100 characters or less'}), 400
            query = query.filter(
                or_(
                    Post.title.ilike(f'%{search_term}%'),
                    Post.content.ilike(f'%{search_term}%'),
                )
            )

        # Sorting
        sort_by = request.args.get('sortBy', 'created_at', type=str)
        sort_order = request.args.get('sortOrder', 'desc', type=str).lower()

        allowed_sort_fields = {
            'created_at': Post.created_at,
            'title': Post.title,
        }

        if sort_by not in allowed_sort_fields:
            return jsonify({'error': 'Invalid sortBy value'}), 400

        column = allowed_sort_fields[sort_by]

        if sort_order not in ('asc', 'desc'):
            return jsonify({'error': 'Invalid sortOrder value'}), 400

        if sort_order == 'asc':
            query = query.order_by(asc(column))
        else:
            query = query.order_by(desc(column))

        posts = query.all()
        return jsonify([post.to_dict() for post in posts]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@posts_bp.route('/posts/<int:post_id>', methods=['GET'])
def get_post(post_id):
    """Get a single post by ID"""
    try:
        post = Post.query.get_or_404(post_id)
        return jsonify(post.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 404

@posts_bp.route('/posts', methods=['POST'])
def create_post():
    """Create a new post"""
    try:
        data = request.get_json()
        
        # Validation
        if not data or not data.get('title') or not data.get('content'):
            return jsonify({'error': 'Title and content are required'}), 400
        
        title = data['title'].strip()
        content = data['content'].strip()
        
        if len(title) > 200:
            return jsonify({'error': 'Title must be 200 characters or less'}), 400
        
        if not title or not content:
            return jsonify({'error': 'Title and content cannot be empty'}), 400
        
        # Create new post
        post = Post(title=title, content=content)
        db.session.add(post)
        db.session.commit()
        
        return jsonify(post.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@posts_bp.route('/posts/<int:post_id>', methods=['PUT'])
def update_post(post_id):
    """Update an existing post"""
    try:
        post = Post.query.get_or_404(post_id)
        data = request.get_json()
        
        # Validation
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        if 'title' in data:
            title = data['title'].strip()
            if len(title) > 200:
                return jsonify({'error': 'Title must be 200 characters or less'}), 400
            if not title:
                return jsonify({'error': 'Title cannot be empty'}), 400
            post.title = title
        
        if 'content' in data:
            content = data['content'].strip()
            if not content:
                return jsonify({'error': 'Content cannot be empty'}), 400
            post.content = content
        
        post.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify(post.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@posts_bp.route('/posts/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    """Delete a post"""
    try:
        post = Post.query.get_or_404(post_id)
        db.session.delete(post)
        db.session.commit()
        
        return jsonify({'message': 'Post deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

