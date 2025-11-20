import { useState } from 'react';
import { postsAPI } from '../services/api';

const CreatePost = ({ onPostCreated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ title: null, content: null });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    const newErrors = { title: null, content: null };

    if (!trimmedTitle) {
      newErrors.title = 'Title is required';
    } else if (trimmedTitle.length > 200) {
      newErrors.title = 'Title must be 200 characters or less';
    }

    if (!trimmedContent) {
      newErrors.content = 'Content is required';
    }

    if (newErrors.title || newErrors.content) {
      setErrors(newErrors);
      return;
    }

    setErrors({ title: null, content: null });

    setIsSubmitting(true);
    try {
      await postsAPI.create({ title: trimmedTitle, content: trimmedContent });
      setTitle('');
      setContent('');
      setIsOpen(false);
      onPostCreated();
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
      >
        + Create New Post
      </button>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-blue-500">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter post title"
            required
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[200px]"
            placeholder="Enter post content"
            required
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">{errors.content}</p>
          )}
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'Create Post'}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              setTitle('');
              setContent('');
            }}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;

