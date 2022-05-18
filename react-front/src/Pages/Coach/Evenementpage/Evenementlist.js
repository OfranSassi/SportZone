import Evenement from './Evenement';

function Evenementlist(props) {
	return (
		<div>
			{props.myEvenements.map(function (x) {
				return (
					<Evenement
						id={x.id}
						label={x.label}
						details={x.details}
						start_date={x.start_date}
						final_date={x.final_date}
						location={x.location}
						state={x.state}
						updateEvenement={props.updateEvenement}
						deleteEvenement={props.deleteEvenement}
					/>
				);
			})}
		</div>
	);
}

export default Evenementlist;
