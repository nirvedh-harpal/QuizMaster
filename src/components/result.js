import React from 'react';
const Result = ({List, score, questionSet}) => {
    return(
        <div className='result-section fd-column'>
			<h4 style={{color: "#252d4a"}}>You scored {score} out of {questionSet.length}</h4>
			<div className='answer-section'>
				<table id="t01">
					<tr>
						<th>Sr.</th>
						<th>Your answer</th> 
						<th>Correct answer</th>
					</tr>
						{List.map((ele,i) => (
							<tr key={i}>
				    			<td>Q.{i+1}</td>
								<td style={{color: ele === questionSet[i].CorrectAnswer ? '#2dd216': '#ff0000' }}>{ele}</td>
								<td>{questionSet[i].CorrectAnswer}</td>
							</tr>
						))}
				</table>
			</div>
		</div>
    )
}
export default Result;