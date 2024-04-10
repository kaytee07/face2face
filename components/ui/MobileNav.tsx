"use client"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image"
import Link from "next/link";
import { usePathname } from "next/navigation";



const MobileNav = () => {
  const pathName = usePathname();

  return (
    <div>
      <section className='w-full max-w-[264px]'>
        <Sheet>
          <SheetTrigger asChild>
            <Image
              src="/icons/hamburger.svg"
              alt="hamburger icon"
              width={36}
              height={36}
              className="cursor-pointer sm:hidden"
            />
          </SheetTrigger>
          <SheetContent side="left" className="border-none text-white bg-dark-1">
             <Link href="/" className='flex items-center gap-1'>
                <Image
                  src="/icons/logo.svg"
                  alt='F2F logo'
                  height={32}
                  width={32}
                  className='max-sm:size-10'
                />
                <p className='text-[26px] font-extrabold text-white'
                >webmeet</p>
            </Link>
            <div className="flex h-[calc(100vh-72px)]
            flex-col justify-between overflow-y-auto"
            >
              <SheetClose asChild>
                <section className="flex h-full flex-col gap-6 
                pt-16 text-white">
                  {sidebarLinks.map((link) => {
                    const isActive = pathName === link.route || pathName.startsWith(`${link.route}/`) ;
                    return (
                      <SheetClose key={link.label} asChild>
                        <Link
                            href={link.route}
                            key={link.label}
                            className={cn('flex gap-4 p-4 rounded-lg w-full max-w-60', {
                                'bg-blue-1': isActive,
                            })}
                        >
                            <Image
                                src={link.imageUrl}
                                alt={link.label}
                                width={20}
                                height={20}
                            />
                            <p className="text-lg font-semibold">
                                {link.label}
                            </p>
                        </Link>
                      </SheetClose>
                    )
                 })}
                </section>
              </SheetClose>

            </div>
          </SheetContent>
        </Sheet>

      </section>
    </div>
  )
}

export default MobileNav;
