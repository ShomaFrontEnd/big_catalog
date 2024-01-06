const BorderWrapper = ({ children }) => {
  return (


    <section className="mx-1 py-2 mb-2 border border-2 bg-gray-700 border-gray-500 rounded">
      {children}
    </section>

  );
}

export default BorderWrapper;