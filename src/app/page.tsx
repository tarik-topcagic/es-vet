// export default function Home() {
//   return (
//     <main className="min-h-screen flex items-center justify-center">
//       <h1 className="text-4xl font-bold text-blue-600">Dobrodošli na ES-Vet!</h1>
//     </main>
//   )
// }
export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Gornji dio – naslov */}
      <section className="flex flex-col items-center justify-center py-20">
        <h1 className="text-4xl font-bold text-blue-600">Dobrodošli na ES-Vet!</h1>
      </section>

      {/* Dummy sadržaj za test scrollanja */}
      <section className="px-4 md:px-20 space-y-8 pb-20">
        {Array.from({ length: 15 }).map((_, index) => (
          <p key={index} className="text-lg text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sit amet interdum ipsum. Nullam a lectus non quam ultrices imperdiet. 
            Quisque ullamcorper malesuada velit, non fringilla est dignissim ut. Sed nec turpis sit amet turpis sollicitudin venenatis.
          </p>
        ))}
      </section>
    </main>
  );
}
