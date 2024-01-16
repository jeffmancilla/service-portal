import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const Header = () => {
	return (
		<header className="flex justify-between items-center">
			<h1>Equipment Services Portal</h1>
			<div className="flex gap-4 items-center">
				<a>My requests</a>
				<Avatar>
					<AvatarImage src="https://github.com/shadcn.png" />
					<AvatarFallback>JM</AvatarFallback>
				</Avatar>
			</div>
		</header>
	)
}

export default Header
