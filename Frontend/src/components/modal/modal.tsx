import React, { FC } from "react";

interface ModalProps {
  id?: string;
  children: React.ReactNode;
  htmlFor: string;
  btnTitle: string;
}

export const Modal: FC<ModalProps> = ({ id, children, htmlFor, btnTitle }) => {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="bg-black rounded-sm text-white text-sm py-1 px-3 mb-2 cursor-pointer"
      >
        {btnTitle}
      </label>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">{children}</div>
      </div>
    </div>
  );
};

interface modalProps {
	show: boolean
	children: JSX.Element
	title?: string
	className?: string
	width?: string
}

export const BasicModal: FC<modalProps> = ({
	show,
	children,
	title,
	className,
	width,
}) => {
	if (!show) {
		return null
	}
	return (
		<>
			<div
				className={`fixed left-0 top-0 right-0 bottom-0 bg-black bg-opacity-25 flex justify-center items-center z-40 ${className}`}
			>
				<h2>{title}</h2>
				<div
					className={`${
						width ? width : 'w-1/2'
					} p-10 border-[1px] rounded bg-white border-gray-500`}
				>
					{children}
				</div>
			</div>
		</>
	)
}
