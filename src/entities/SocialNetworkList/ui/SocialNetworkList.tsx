import { FC, useMemo } from "react";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { socialNetworkListModel } from "../model/socialNetworkListModel";
import cls from "./SocialNetworkList.module.scss";

interface SocialNetworkListProps {
	className?: string
}

export const SocialNetworkList: FC<SocialNetworkListProps> = ({ className }) => {
	const socialNetworkItem = useMemo(() => {
		return socialNetworkListModel.map(({ id, Icon, href }) => {
			return (
				<li className={cls.SocialNetworkList__item} key={id}>
					<a className={cls.SocialNetworkList__link} href={href}>
						<Icon />
					</a>
				</li>
			);
		});
	}, []);
	return (
		<ul className={cn(cls.SocialNetworkList, {}, [className])}>
			{socialNetworkItem}
		</ul>
	);
};
