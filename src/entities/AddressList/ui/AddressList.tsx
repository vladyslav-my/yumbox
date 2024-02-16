import { FC } from "react";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import cls from "./AddressList.module.scss";

interface AddressListProps {
	className?: string
}

export const AddressList: FC<AddressListProps> = ({ className }) => {
	return (
		<address className={cn(cls.AddressList, {}, [className])}>
			<ul className={cls.AddressList__this}>
				<li className={cls.AddressList__item}>
					<a
						className={cn(cls.AddressList__link, {}, [cls.AddressList__link_orange])}
						href="mailto:yumbox.lutsk@gmail.com"
					>
						yumbox.lutsk@gmail.com
					</a>
				</li>
				<li className={cls.AddressList__item}>
					<a
						className={cls.AddressList__link}
						href="tel:+380938239293"
					>
						+380 93 823 92 93
					</a>
				</li>
			</ul>
		</address>

	);
};
