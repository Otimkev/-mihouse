'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <div className="justify-center items-center">
    <Image
      onClick={() => router.push('/')}
      className="md:block cursor-pointer" 
      src="/images/logo.png" 
      height="40" 
      width="40" 
      alt="Logo" 
    />
    <div>mihouse</div>
    </div>

   );
}
 
export default Logo;
