"use client"
import Image from 'next/image';
import CheckIcon from '/public/check_icon.svg';

interface CheckProps {
    state: boolean;
    label: string;
    changeState: () => void;
}

export function Check({ state, label, changeState }: CheckProps) {
    return (
        <div className="flex justify-start items-center py-2 pr-2">
            <input type="checkbox" defaultChecked={state} className='hidden interactive-check-done' id={label} />
            <label htmlFor={label} defaultChecked={state} className="cursor-pointer">
                <div
                    className='bg-[rgba(123,136,157,0.33)] rounded-sm flex justify-center items-center size-8'
                    onClick={changeState}
                >
                    <Image
                        src={CheckIcon}
                        alt="Check Icon"
                        width={16}
                        className='select-none'
                    />
                </div>
            </label>
        </div>
    )
}