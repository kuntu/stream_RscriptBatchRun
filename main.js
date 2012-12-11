/**
 * New node file use spawn to test
 */
fs = require('fs');
timer = require('timers');
var spawn = require('child_process').spawn;

var getPath = function(user,model, runId){
	return './'+user+'/'+model+'/'+runId+'.txt';
}

var buildScriptPara = function (run){
	var paras;
	for(p in run['para']){
		paras[p]=0;
	}
	return paras
}

var getArgs = function(paras){
	var agrs=[];
	for(p in paras){
		args.push(p);
	}
	return args;
}

var runModels = function(runs,idx){
	
}

 //data structure for run
var 	Rrun={
			user: 'kun',
			runId: 1,
			scriptName: 'testR',
			para:['TEST', 'the', 'auguments'],	//given indatabase
			input:[],
			required_runs:[],
			outputs:['output1_name','output2_name']	//given in database
		}
var Rrun2 = {
			user: 'kun',
			runId: 2,
			scriptName: 'testR',
			para:['TEST', 'the', 'auguments'],	//given indatabase
			input:[],
			required_runs:['testR',1],
			outputs:['output1_name','output2_name']	//given in database
		}
var runs =[Rrun,runs];
var idx=0;

//console.log(Rrun.toSource());
/* add to spawn, as an array		
*/
RArgs =[Rrun['scriptName']+'.R'];
//TODO: adjust the order of the argument here
var paras = Rrun['para'];
//....
RArgs = RArgs.concat(paras);
var ls	= spawn('Rscript',RArgs);
ls['data']=Rrun['user']+' '+Rrun['runId']+' '+Rrun['scriptName'];
/*
assume we have let r finish running and we know the output directory
var output ={
		user:
		runId:
		scriptName:
		output1:
		output2:
	}
*/


var outputfile = function(Rtrun, data){
	path = getPath(Rrun['user'],Rrun['scriptName'],Rrun['runId']);
	
	fs.exists(path,function(exists){
    	if(!exists)	{    		
    		fs.mkdir(Rrun['user']);
    		fs.mkdir(Rrun['user']+'/'+Rrun['scriptName']);
    	}
    });
    var regex = /\w+/g;
	console.log(data.match(regex));
	fs.writeFile(path, data.match(regex).toString(), function(err){
		if (err) throw err;
 	 	console.log(Rrun['runId']+' is saved!');
	});
}

ls.stdout.on('data', function (data) {  
  ls['data'] = ls['data']+' '+data.toString();
  //console.log('stdout : ' + ls['data']);
});

ls.stdout.on('end', function(data){
	//ls['data'] = ls['data']+' '+data
	console.log('stdEnd : ' + ls['data']);
	outputfile(Rrun,ls['data'])
});

ls.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

ls.on('exit', function (code) {
  //console.log('child process exited with code ' + code);
  idx++;
  if(idx<runs.length){
  	runModels(runs,idx);
  }
});