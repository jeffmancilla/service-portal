import { SignInButton } from "@clerk/clerk-react"
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react"
import { Link } from "react-router-dom"

export default function Portal() {
	return (
		<>
			<div
				className="hero"
				style={{
					backgroundImage:
						"url(smithing-hero.jpg)",
				}}
			>
				<div className="hero-overlay bg-opacity-75"></div>
				<div className="py-16 hero-content text-center text-neutral-content">
					<div className="max-w-md">
						<h2 className="text-5xl font-bold mb-5 leading-tight">
							Forge weapons.
							<br />
							Make shiny.
							<br />
							More happy.
						</h2>
						<p className="mb-5">
							Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
							excepturi exercitationem quasi. In deleniti eaque aut repudiandae
							et a id nisi.
						</p>
						<Unauthenticated>
							<button className="block mx-auto btn btn-primary">
								<SignInButton mode="modal" />
							</button>
						</Unauthenticated>
					</div>
				</div>
			</div>
			<Authenticated>
			<hr className="my-8" />
				<div className="flex flex-wrap gap-4 justify-center">
					<div className="card w-80 bg-base-100 shadow-xl image-full">
						<figure>
							<img src="repair.png" alt="Repair" />
						</figure>
						<div className="card-body">
							<h2 className="card-title">Next-day repair service</h2>
							<p>
								Missed your target and hit a rock instead? We've got you
								covered.
							</p>
							<div className="card-actions justify-end">
								<Link to="/repair">
									<button className="btn btn-primary">Repair</button>
								</Link>
							</div>
						</div>
					</div>
					<div className="card w-80 bg-base-100 shadow-xl image-full">
						<figure>
							<img src="enchant.jpeg" alt="Enchant" />
						</figure>
						<div className="card-body">
							<h2 className="card-title">Enchant</h2>
							<p>Unlock rizzmaster status - magic, fire, lightning, holy enchants available</p>
							<div className="card-actions justify-end">
								<button className="btn btn-ghost">Coming soon</button>
							</div>
						</div>
					</div>
				</div>
			</Authenticated>
			<AuthLoading>Still loading</AuthLoading>
		</>
	)
}
