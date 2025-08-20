export default function PopularSports() {
  const sports = [
    {
      name: "Football",
      image:
        "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vdGJhbGx8ZW58MHx8MHx8fDA%3D",
    },
    {
      name: "Cricket",
      image:
        "https://plus.unsplash.com/premium_photo-1661890079209-72b76e49768f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y3JpY2tldHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Basketball",
      image:
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFza2V0YmFsbHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Tennis",
      image:
        "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVubmlzfGVufDB8fDB8fHww",
    },
  ];

  return (
   <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
  <h2 className="text-4xl font-bold text-center mb-12 text-indigo-600">
    Popular Sports
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
    {sports.map((sport, index) => (
      <div
        key={index}
        className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500"
      >
        {/* Background Image */}
        <img
          src={sport.image}
          alt={sport.name}
          className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition duration-500"></div>

        {/* Text */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
          <h3 className="text-lg md:text-xl font-semibold text-white drop-shadow-lg tracking-wide">
            {sport.name}
          </h3>
          <span className="block w-12 h-1 bg-indigo-500 mx-auto mt-2 rounded-full"></span>
        </div>
      </div>
    ))}
  </div>
</div>

  );
}
