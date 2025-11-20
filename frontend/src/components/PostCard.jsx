import { useState } from 'react';
import { postsAPI } from '../services/api';

const PostCard = ({ post, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedContent, setEditedContent] = useState(post.content);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errors, setErrors] = useState({ title: null, content: null });

  const handleUpdate = async () => {
    const trimmedTitle = editedTitle.trim();
    const trimmedContent = editedContent.trim();

    const newErrors = { title: null, content: null };

    if (!trimmedTitle) {
      newErrors.title = 'Title cannot be empty';
    } else if (trimmedTitle.length > 200) {
      newErrors.title = 'Title must be 200 characters or less';
    }

    if (!trimmedContent) {
      newErrors.content = 'Content cannot be empty';
    }

    if (newErrors.title || newErrors.content) {
      setErrors(newErrors);
      return;
    }

    setErrors({ title: null, content: null });

    try {
      await postsAPI.update(post.id, {
        title: trimmedTitle,
        content: trimmedContent,
      });
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }
    setIsDeleting(true);
    try {
      await postsAPI.delete(post.id);
      onDelete();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border-2 border-blue-500">
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="w-full text-xl font-bold mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Post Title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
          placeholder="Post Content"
        />
        {errors.content && (
          <p className="mb-2 text-sm text-red-600">{errors.content}</p>
        )}
        <div className="flex gap-2">
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Save
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setEditedTitle(post.title);
              setEditedContent(post.content);
            }}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-2xl font-bold text-gray-800">{post.title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
      <p className="text-gray-600 mb-4 whitespace-pre-wrap">{post.content}</p>
      <div className="text-sm text-gray-500 border-t pt-3">
        <p>Posted on: {formatDate(post.created_at)}</p>
        {post.updated_at !== post.created_at && (
          <p>Last updated: {formatDate(post.updated_at)}</p>
        )}
      </div>
    </div>
  );
};

export default PostCard;

