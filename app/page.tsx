

import React from 'react';
import MenuItem from "@/components/MenuItem";
import { HiOutlineChartBarSquare } from "react-icons/hi2";
import { RiLightbulbFill, RiCompass3Fill } from "react-icons/ri";
import { LuLayoutList } from "react-icons/lu";


const Home = () => {
  return (
    <>
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-5xl'>WELCOME</h1>
      <p className='text-xl'>Username </p>
    </div>

    <div> </div>
    <div className='flex flex-col gap-5'>
      <MenuItem
        text="See What's on My List"
        color="accentColor"
        icon={LuLayoutList}
      />
      <MenuItem
        text="Start a New Adventure"
        color="secondColor"
        icon={RiCompass3Fill}
      />
      <MenuItem
        text="Get Inspired by Others"
        color="thirdColor"
        icon={RiLightbulbFill}
      />
      <MenuItem
        text="Track My Progress"
        color="neutralWhite"
        icon={HiOutlineChartBarSquare}
      />
    </div>
    
    </>
  );
}

export default Home