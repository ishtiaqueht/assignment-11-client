// Testimonials.jsx
export default function Testimonials() {
  const reviews = [
    {
      name: "Rahim Uddin",
      feedback:
        "This platform made it so easy to find and join football tournaments. Loved the experience!",
      image: "https://images.unsplash.com/photo-1622258416260-cc79f4763be4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGRlc2klMjBzb2Z0b3dhcmUlMjBlbmdpbmVlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Sadia Khan",
      feedback:
        "As a cricket fan, I found some amazing events nearby. Highly recommend it!",
      image: "https://plus.unsplash.com/premium_photo-1661683494373-c66a1b34ce77?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGVzaSUyMHNvZnRvd2FyZSUyMGVuZ2luZWVyJTIwd29tZW58ZW58MHx8MHx8fDA%3D",
    },
    {
      name: "Arif Hossain",
      feedback:
        "Smooth experience, great UI, and excellent event details. Looking forward to more.",
      image: "https://images.unsplash.com/photo-1516379878324-283ddaa05e0a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGRlc2klMjBzb2Z0b3dhcmUlMjBlbmdpbmVlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  return (
   <div className="py-20 bg-gradient-to-b from-white to-gray-50">
  <h2 className="text-4xl font-bold text-center mb-14 text-indigo-600">
    What People Say
  </h2>

  <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
    {reviews.map((review, index) => (
      <div
        key={index}
        className="relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-indigo-100 hover:border-indigo-300 hover:shadow-2xl transition duration-500"
      >
        {/* Profile */}
        <div className="flex items-center mb-6">
          <img
            src={review.image}
            alt={review.name}
            className="w-14 h-14 rounded-full object-cover mr-4 ring-2 ring-indigo-200"
          />
          <div>
            <h3 className="font-semibold text-lg text-gray-800">{review.name}</h3>
            <div className="flex text-yellow-400 text-sm">
              ⭐⭐⭐⭐⭐
            </div>
          </div>
        </div>

        {/* Feedback */}
        <p className="text-gray-600 italic leading-relaxed">
          “{review.feedback}”
        </p>

        {/* Decorative Quote */}
        <span className="absolute top-4 right-6 text-indigo-200 text-6xl font-serif select-none">“</span>
      </div>
    ))}
  </div>
</div>

  );
}
