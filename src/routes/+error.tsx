import { useNavigate, useRouteError } from "react-router-dom"

export default function Error() {
	const navigate = useNavigate()
	const error = useRouteError()
	console.error(error)

	return (
		<div id="error-page">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<button className="btn btn-primary" onClick={() => navigate(-1)}>Go back</button>
		</div>
	)
}
