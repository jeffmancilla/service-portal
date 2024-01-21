import { SignInButton } from "@clerk/clerk-react"
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react"
import { Link } from "react-router-dom"

export default function Portal() {
	return (
		<>
			<h2 className="text-5xl font-bold my-16 leading-tight">
				Forge weapons.
				<br />
				Make shiny.
				<br />
				More happy.
			</h2>
			<Authenticated>
				<div className="flex flex-wrap gap-4 justify-center">
					<div className="card w-80 bg-base-100 shadow-xl image-full">
						<figure>
							<img src="repair.png" alt="Repair" />
						</figure>
						<div className="card-body">
							<h2 className="card-title">Repair weapon</h2>
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
							<p>We offer magic, fire, lightning and holy</p>
							<div className="card-actions justify-end">
								<button className="btn btn-primary">Coming soon</button>
							</div>
						</div>
					</div>
				</div>
			</Authenticated>
			<Unauthenticated>
				<button className="btn btn-primary">
					<SignInButton mode="modal" />
				</button>
			</Unauthenticated>
			<AuthLoading>Still loading</AuthLoading>
		</>
	)
}
