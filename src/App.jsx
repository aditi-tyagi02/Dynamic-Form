import { ToastContainer } from 'react-toastify';
import DynamicForm from './components/DynamicForm';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <header className="bg-white shadow-lg border-b border-indigo-100">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Assignment Task
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <DynamicForm />
      </main>

      <footer className="bg-white shadow-lg border-t border-indigo-100 mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 text-center text-indigo-600">
          © 2024 Aditi Tyagi. All rights reserved.
        </div>
      </footer>

      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        theme="colored"
      />
    </div>
  );
}

export default App;