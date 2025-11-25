
import React from 'react';
import Layout from '../components/Layout';
import { MOCK_TESTIMONIALS } from '../constants';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-5 h-5 ${i < rating ? 'fill-current' : 'text-slate-600'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
      ))}
    </div>
  );
};

const TestimonialsPage: React.FC = () => {
  return (
    <Layout>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900/50 to-slate-900 rounded-b-[40px] shadow-lg">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Hear From Our Happy Users</h1>
          <p className="text-slate-300">Real Stories, Real Success.</p>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_TESTIMONIALS.map((testimonial, index) => (
            <div key={index} className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl flex flex-col">
              <div className="mb-4">
                <StarRating rating={testimonial.rating} />
              </div>
              <p className="text-slate-300 mb-4 flex-grow">"{testimonial.text}"</p>
              <div className="flex items-center mt-auto">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-sm text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default TestimonialsPage;
