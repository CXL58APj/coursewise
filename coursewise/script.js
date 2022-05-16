

var prompts = [
{
	prompt: 'Communication and Analysis Skills are very important Computer related skills to learn more about.',
	weight: -1,
	class: 'group0'
},
{
	prompt: 'Data Components, Security and Management are very important to learn also in Computer Studies.',
	weight: -1,
	class: 'group1'
},
{
	prompt: 'Databases and Cloud Storages are need to be integrated and secured as part of data protection in Computer Systems.',
	weight: -1,
	class: 'group2'
},
{
	prompt: 'Computer Solution Company are always practiced on both hardware and software methods in data processing and providing services to the clients.',
	weight: -1,
	class: 'group3'
},
{
	prompt: 'Data Interpetation and Analyzation are integral part of Information Systems.',
	weight: -1,
	class: 'group4'
},
{
	prompt: '--',
	weight: -1,
	class: 'group5'
},
{
	prompt: 'Art Creation Skills are applicable in learning and developing Computer projects and systems',
	weight: 1,
	class: 'group6'
},
{
	prompt: 'Learning about Hardware and Software especially the Multimedia are interestingly and common in current trends of Computer Components nowadays.',
	weight: 1,
	class: 'group7'
},
{
	prompt: 'The usage of grapahics, audios, and simulations are part of the enhancement that gives new purpose on developing computer systems.',
	weight: 1,
	class: 'group8'
},
{
	prompt: 'Game development, VFX and graphics editing, and audio enhancing are some examples of the Entertainment section in Computer Systems Development.',
	weight: 1,
	class: 'group9'
},
{
	prompt: '--',
	weight: 1,
	class: 'group10'
},
{
	prompt: '--',
	weight: 1,
	class: 'group11'
}

]

var prompt_values = [
{
	value: 'Strongly Agree', 
	class: 'btn-default btn-strongly-agree',
	weight: 5
},
{
	value: 'Agree',
	class: 'btn-default btn-agree',
	weight: 3,
}, 
{
	value: 'Neutral', 
	class: 'btn-default',
	weight: 0
},
{
	value: 'Disagree',
	class: 'btn-default btn-disagree',
	weight: -3
},
{ 
	value: 'Strongly Disagree',
	class: 'btn-default btn-strongly-disagree',
	weight: -5
}
]

function createPromptItems() {

	for (var i = 0; i < prompts.length; i++) {
		var prompt_li = document.createElement('li');
		var prompt_p = document.createElement('p');
		var prompt_text = document.createTextNode(prompts[i].prompt);

		prompt_li.setAttribute('class', 'list-group-item prompt');
		prompt_p.appendChild(prompt_text);
		prompt_li.appendChild(prompt_p);

		document.getElementById('quiz').appendChild(prompt_li);
	}
}


function createValueButtons() {
	for (var li_index = 0; li_index < prompts.length; li_index++) {
		var group = document.createElement('div');
		group.className = 'btn-group btn-group-justified';

		for (var i = 0; i < prompt_values.length; i++) {
			var btn_group = document.createElement('div');
			btn_group.className = 'btn-group';

			var button = document.createElement('button');
			var button_text = document.createTextNode(prompt_values[i].value);
			button.className = 'group' + li_index + ' value-btn btn ' + prompt_values[i].class;
			button.appendChild(button_text);

			btn_group.appendChild(button);
			group.appendChild(btn_group);

			document.getElementsByClassName('prompt')[li_index].appendChild(group);
		}
	}
}

createPromptItems();
createValueButtons();


var total = 0;

function findPromptWeight(prompts, group) {
	var weight = 0;

	for (var i = 0; i < prompts.length; i++) {
		if (prompts[i].class === group) {
			weight = prompts[i].weight;
		}
	}

	return weight;
}

function findValueWeight(values, value) {
	var weight = 0;

	for (var i = 0; i < values.length; i++) {
		if (values[i].value === value) {
			weight = values[i].weight;
		}
	}

	return weight;
}


$('.value-btn').mousedown(function () {
	var classList = $(this).attr('class');

	var classArr = classList.split(" ");

	var this_group = classArr[0];

	if($(this).hasClass('active')) {
		$(this).removeClass('active');
		total -= (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
	} else {

		total -= (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $('.'+this_group+'.active').text()));

		$('.'+this_group).removeClass('active');

		$(this).addClass('active');
		total += (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
	}

	console.log(total);
})



$('#submit-btn').click(function () {

	$('.results').removeClass('hide');
	$('.results').addClass('show');
	
	if(total < 0) {

		document.getElementById('results').innerHTML = '<b>You can take IT/IS!</b><br><br>\
		Explanation';
	} else if(total > 0) {
		document.getElementById('results').innerHTML = '<b>You can take EMC!</b><br><br>\
		Explanation';
	} else {
		document.getElementById('results').innerHTML = '<b>You can take CS!</b><br><br>\
		Explanation';
	}

	// Hide the quiz after they submit their results
	$('#quiz').addClass('hide');
	$('#submit-btn').addClass('hide');
	$('#retake-btn').removeClass('hide');
})

// Refresh the screen to show a new quiz if they click the retake quiz button
$('#retake-btn').click(function () {
	$('#quiz').removeClass('hide');
	$('#submit-btn').removeClass('hide');
	$('#retake-btn').addClass('hide');

	$('.results').addClass('hide');
	$('.results').removeClass('show');
})