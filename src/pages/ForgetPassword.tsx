
const ForgetPassword = () => {
  return (
    <div className="flex h-screen">
      {/* Left Half: Input Field and Button */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-gray-100">
        <div className='flex items-center justify-center gap-2 mb-2'>
          <img src="./logo_image.png" alt='logo' width={50} height={50} />
          <div>
            <h3 className='font-extrabold'>Bansawoli</h3>
            <h4 className='font-semibold'>Forget Password</h4>
          </div>
        </div>
        <form className="w-3/4 max-w-sm my-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Phone Number
          </label>
          <input
            type="number"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4 appearance-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Right Half: Background Image */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: "url(./login_bg_image.jpg)", // Replace with your image URL
          backgroundPosition: "center center",
          backgroundSize: 'contain',
          backgroundRepeat: "no-repeat"
        }}
      ></div>
    </div>
  );
};

export default ForgetPassword;
