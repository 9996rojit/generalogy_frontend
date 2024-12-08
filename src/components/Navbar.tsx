import FormModal from "./FormModel"


const Navbar = () => {
  const role = 'admin'
  return (
    <div className='flex items-center justify-between p-4'>
      {/* SEARCH BAR */}
      <div className='hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2'>
        <img src="/search.png" width="14px" height="14px" />
        <input type="text" placeholder="Search..." className="w-[200px] p-2 bg-transparent outline-none" />
      </div>
      {/* ICONS AND USER */}
      <div className='flex items-center gap-6 justify-end w-full'>

        <div className='bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer'>
          {/* <img src="/student.png" width={'20px'} height={'20px'} /> */}
          {role === "admin" && <FormModal
            table="teacher"
            type="create"
          />}
        </div>
        <div className='bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative'>
          <img src="/announcement.png" width={'20px'} height={'20px'} />
          <div className='absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs'>1</div>
        </div>
        <div className='flex flex-col'>
          <span className="text-xs leading-3 font-medium">John Doe</span>
          <span className="text-[10px] text-gray-500 text-right">Admin</span>
        </div>
        <img src="/avatar.png" width={'36px'} height={'36px'} className="rounded-full" />
      </div>
    </div>
  )
}

export default Navbar