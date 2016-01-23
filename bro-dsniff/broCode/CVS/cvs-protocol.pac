type CVS_PDU = record {
	data: RE/BEGIN VERIFICATION REQUEST(.*?)\x0a/;
	locate:RE/(.*)\x0a/;
	username : RE/(.*)/;
	dotusername: RE/\x0a/;
	password : RE/(.*)/;
	dotpassword: RE/\x0a/;
	rest : bytestring &restofdata; 	
} &byteorder=bigendian;






