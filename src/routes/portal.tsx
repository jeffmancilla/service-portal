import { SignInButton } from "@clerk/clerk-react"
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react"
import { Link } from "react-router-dom"

export default function Portal() {
	return (
		<>
			<div
				className="hero"
				style={{
					backgroundImage: "url(smithing-hero.jpg)",
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
						<p className="mb-5">We used to be adventurers like you</p>
						<p>...then we all took an arrow in the knee</p>
						<Unauthenticated>
							<button className="block mx-auto btn btn-primary">
								<SignInButton mode="modal" />
							</button>
						</Unauthenticated>
					</div>
				</div>
			</div>
			<Authenticated>
				<div className="mt-10 flex flex-wrap gap-4 justify-between">
					<div className="card lg:card-side bg-base-100 shadow-xl">
						<figure>
							<img src="repair.png" alt="Repair" />
						</figure>
						<div className="card-body">
							<h2 className="card-title">Next-day repair service</h2>
							<p>
								Missed your target and hit a rock instead? We've got you
								covered.
							</p>
							<div className="card-actions">
								<Link to="/repair">
									<button className="btn btn-primary">Repair</button>
								</Link>
							</div>
						</div>
					</div>
					<div className="card lg:card-side bg-base-100 shadow-xl">
						<figure>
							<img src="enchant.jpeg" alt="Enchant" />
						</figure>
						<div className="card-body">
							<h2 className="card-title">Enchant</h2>
							<p>
								Purchase a weapon enchant and discover what it means to w rizz
							</p>
							<div className="card-actions">
								<button className="btn btn-ghost">Coming soon</button>
							</div>
						</div>
					</div>
				</div>
			</Authenticated>
			<AuthLoading>
				<span className="block my-5 mx-auto loading loading-dots loading-xs"></span>
			</AuthLoading>
		</>
	)
}
