
library("rjson");
args <- commandArgs(trailingOnly = TRUE);
print(args)
if(length(args)>0){
	para <-fromJSON(args)

#get data from save file	
if(length(para$pre_runs)>0){
	runs<- para$pre_runs[[1]]

	path <- paste0("./",runs$user,"/",runs$scriptName,"/",runs$runId,".txt")
	print(path)
	pre_para <- readLines(path,warn=FALSE)#scan(path,txt), use warn=false, otherwise, there would be err because the file does not have an EOF mark.
}
if(para$TEST)
	para$TEST <- para$TEST+6	
	
	#save data to json file
	print(toJSON(para))
	if(length(para$output_file)>0)
		write(toJSON(para),para$output_file)
}
#length(args)
# trailingOnly=TRUE means that only arguments after --args are returned
# if trailingOnly=FALSE then you got:
# [1] "--no-restore" "--no-save" "--args" "2010-01-28" "example" "100"
# rscript testR.R '{"what":1, "TEST":2, "pre_runs":[{"user":"kun","scriptName":"testR","runId":1}]}'