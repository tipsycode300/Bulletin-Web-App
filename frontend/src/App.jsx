import { useState, useEffect } from 'react';
import { postsAPI } from './services/api';
import PostCard from './components/PostCard';
import CreatePost from './components/CreatePost';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchError, setSearchError] = useState(null);

  const fetchPosts = async (options = {}) => {
    try {
      setLoading(true);
      setError(null);
      const params = {
        q: options.search ?? search,
        sortBy: options.sortBy ?? sortBy,
        sortOrder: options.sortOrder ?? sortOrder,
      };
      const response = await postsAPI.getAll(params);
      setPosts(response.data);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = search.trim();
    if (trimmed.length > 100) {
      setSearchError('Search term must be 100 characters or less');
      return;
    }
    setSearchError(null);
    fetchPosts({ search: trimmed });
  };

  const handleSortChange = (field, value) => {
    if (field === 'sortBy') {
      setSortBy(value);
      fetchPosts({ sortBy: value });
    } else if (field === 'sortOrder') {
      setSortOrder(value);
      fetchPosts({ sortOrder: value });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">
            📌 Bulletin Board
          </h1>
          <p className="text-gray-600 text-lg">
            Share your thoughts and announcements
          </p>
        </header>

        <section className="bg-white/80 backdrop-blur rounded-lg shadow mb-6 p-4 md:p-5 border border-blue-100">
          <form onSubmit={handleSearchSubmit}>
            <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_170px_140px] md:items-center">
              <div className="flex flex-col md:pt-8">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search posts
                </label>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by title or content"
                  className="w-full px-3 h-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="mt-1 min-h-[24px]">
                  {searchError ? (
                    <p className="text-sm text-red-600 py-1">{searchError}</p>
                  ) : (
                    <p className="text-sm text-transparent py-1">placeholder</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order
                </label>
                <div className="relative">
                  <select
                    value={sortOrder}
                    onChange={(e) =>
                      handleSortChange('sortOrder', e.target.value)
                    }
                    className="w-full appearance-none px-3 pr-10 h-12 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="desc">Newest first</option>
                    <option value="asc">Oldest first</option>
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                    ▼
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="block text-sm font-medium text-gray-700 mb-1">
                  Action
                </span>
                <button
                  type="submit"
                  className="h-12 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </section>

        <div className="mb-6">
          <CreatePost onPostCreated={fetchPosts} />
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p className="font-bold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {posts.length === 0 && !error ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-xl">
              No posts yet. Create the first one!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onUpdate={fetchPosts}
                onDelete={fetchPosts}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
