import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'

const Promos = () => {
	return (
		<div className="max-w-fit mx-auto">
			<Carousel>
				<CarouselContent>
					<CarouselItem>...</CarouselItem>
					<CarouselItem>...</CarouselItem>
					<CarouselItem>...</CarouselItem>
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	)
}

export default Promos
