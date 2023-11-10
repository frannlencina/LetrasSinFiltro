'use client'
import * as Menubar from '@radix-ui/react-menubar';
import * as Dialog from '@radix-ui/react-dialog';
import { stylesMenuBar } from '@/app/utils/styles';
import Badge from '../Badge';
import Image from 'next/image';

import { selectTemplate } from '../../utils/ToastCustom'
export default function MenubarGen() {
    
    {/* Simulacion temporal  almacenamiento de plantillas. Proximamente utilizacion JSONS y BD */ }
    
    const plantillas = [
        { src: "/templates/magnum.png", alt: "Plantilla Colocial", name: "Colocial" },
        { src: "/templates/magnum.png", alt: "Plantilla Griego", name: "Griego" },
        { src: "/templates/magnum.png", alt: "Plantilla Fluyente", name: "Fluyente" },
        { src: "/templates/magnum.png", alt: "Plantilla Magnum", name: "Magnum" },
        { src: "/templates/magnum.png", alt: "Plantilla Say", name: "Say" },
    ];

    // Funcion para detener el auto cerrado del Modal 
    const handleOutsideClick = (e) => {
        e.preventDefault();
    }
    return (
        <>

            <Menubar.Root className={stylesMenuBar.root}>
                <Menubar.Menu>
                    <Dialog.Root  >
                        <Dialog.Trigger className={stylesMenuBar.trigger} asChild>
                            <button>
                                Plantilla
                            </button>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <Dialog.Overlay id='dialog-over' className="bg-black bg-opacity-50 fixed inset-0 z-10 animate-fadeIn" />
                            <Dialog.Content  className="fixed animate-scaleIn z-20 top-[50%] left-[50%] overscroll-y-none w-[90vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px]" onInteractOutside={handleOutsideClick}>
                                <Badge text='Las plantillas del generador no son las mismas que el sector comunidad.' icon={true} type='yellow' />
                                <Dialog.Title className="m-0 mt-4 text-lg font-medium">
                                    Plantillas
                                </Dialog.Title>
                                <Dialog.Description className=" mt-[10px] text-md">
                                    Elige la plantilla que mas te guste y usala a tu gusto
                                </Dialog.Description>
                                <hr className='my-6' />
                                <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2 place-items-center'>
                                    {plantillas.map((item, index) => (
                                        <div>
                                            <div className='relative group rounded-lg  '>
                                                <div onClick={selectTemplate} className='hidden absolute w-full h-full group-hover:flex items-center justify-center bg-blue-600 bg-opacity-70 rounded-lg cursor-pointer '>
                                                    <div className='font-bold text-white select-none text-4xl'><i class="ri-check-line"></i></div>
                                                </div>
                                                <Image
                                                    className='rounded-lg w-36'
                                                    src={item.src}
                                                    width={100}
                                                    height={100}
                                                    alt={item.alt}
                                                />
                                            </div>
                                            <div className='text-sm opacity-70 flex items-center font-medium gap-2 mt-2' key={index}>
                                                {item.name}
                                                <Badge icon={false} text='new' type='green' />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-[25px] flex justify-end">
                                    <Dialog.Close asChild>
                                        <button className="bg-green4 hover:bg-red-200 transition-all  text-red-600 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                                            Cerrar
                                        </button>
                                    </Dialog.Close>
                                </div>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                </Menubar.Menu>

                <Menubar.Menu>
                    <Menubar.Trigger className={stylesMenuBar.trigger}>Config</Menubar.Trigger>
                    <Menubar.Portal>
                        <Menubar.Content className={stylesMenuBar.content} align="start" sideOffset={5} alignOffset={-3}>
                            <Menubar.Item className={stylesMenuBar.item}>
                                Colores <i class="ri-palette-line"></i>
                            </Menubar.Item>
                            <Menubar.Item className={stylesMenuBar.item}>
                                Fuente <i class="ri-font-size-2"></i>
                            </Menubar.Item>
                            <Menubar.Item className='opacity-50 pointer-events-none select-none'>
                                Texto <i class="ri-font-size-2"></i>
                            </Menubar.Item>
                        </Menubar.Content>
                    </Menubar.Portal>
                </Menubar.Menu>
                <Menubar.Menu>
                    <Menubar.Trigger className='opacity-50 pointer-events-none mx-2'>Soon</Menubar.Trigger>
                    <Menubar.Portal>
                        <Menubar.Content
                            className="MenubarContent"
                            align="start"
                            sideOffset={5}
                            alignOffset={-14}
                        >

                            <Menubar.CheckboxItem
                                className="MenubarCheckboxItem inset"

                            >
                                <Menubar.ItemIndicator className="MenubarItemIndicator">

                                </Menubar.ItemIndicator>

                            </Menubar.CheckboxItem>

                            <Menubar.Separator className="MenubarSeparator" />
                            <Menubar.Item className="MenubarItem inset">
                                Reload <div className="RightSlot">⌘ R</div>
                            </Menubar.Item>
                            <Menubar.Item className="MenubarItem inset" disabled>
                                Force Reload <div className="RightSlot">⇧ ⌘ R</div>
                            </Menubar.Item>
                            <Menubar.Separator className="MenubarSeparator" />
                            <Menubar.Item className="MenubarItem inset">Toggle Fullscreen</Menubar.Item>
                            <Menubar.Separator className="MenubarSeparator" />
                            <Menubar.Item className="MenubarItem inset">Hide Sidebar</Menubar.Item>
                        </Menubar.Content>
                    </Menubar.Portal>
                </Menubar.Menu>

                <Menubar.Menu>
                    <Menubar.Trigger className='opacity-50 pointer-events-none'>Soon</Menubar.Trigger>
                    <Menubar.Portal>
                        <Menubar.Content
                            className="MenubarContent"
                            align="start"
                            sideOffset={5}
                            alignOffset={-14}
                        >
                            <Menubar.RadioGroup>

                                <Menubar.RadioItem className="MenubarRadioItem inset">
                                    <Menubar.ItemIndicator className="MenubarItemIndicator">

                                    </Menubar.ItemIndicator>

                                </Menubar.RadioItem>

                                <Menubar.Separator className="MenubarSeparator" />
                                <Menubar.Item className="MenubarItem inset">Edit…</Menubar.Item>
                                <Menubar.Separator className="MenubarSeparator" />
                                <Menubar.Item className="MenubarItem inset">Add Profile…</Menubar.Item>
                            </Menubar.RadioGroup>
                        </Menubar.Content>
                    </Menubar.Portal>
                </Menubar.Menu>
            </Menubar.Root>
        </>
    )
}