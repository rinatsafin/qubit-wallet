export default function NotFound() {
  return (
    <div className='h-[100vh] w-[100vw] bg-white p-10 text-center text-rose-500 mf:flex mf:items-center mf:justify-center'>
      <h1 className='border-r-2 pr-[23px] text-3xl font-semibold mf:border-[#0000004d]'>
        404: Not Found
      </h1>
      <p className='mf:pl-3'>Could not find requested resource</p>
    </div>
  );
}
