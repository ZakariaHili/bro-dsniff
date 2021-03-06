##! Implements base functionality for tacacs analysis.
##! Generates the Tacacs.log file.

# Generated by binpac_quickstart

module Tacacs;

export {
	redef enum Log::ID += { LOG };

	type Info: record {
		## Timestamp for when the event happened.
		ts:     time    &log;
		## Unique ID for the connection.
		uid:    string  &log;
		## The connection's 4-tuple of endpoint addresses/ports.
		id:     conn_id &log;
		
		# ## TODO: Add other fields here that you'd like to log.
	};

	## Event that can be handled to access the tacacs record as it is sent on
	## to the loggin framework.
	global log_tacacs: event(rec: Info);
}

# TODO: The recommended method to do dynamic protocol detection
# (DPD) is with the signatures in dpd.sig. If you can't come up
# with any signatures, then you can do port-based detection by
# uncommenting the following and specifying the port(s):

 const ports = { 49/tcp };

 redef likely_server_ports += { ports };

event bro_init() &priority=5
	{
	Log::create_stream(Tacacs::LOG, [$columns=Info, $ev=log_tacacs, $path="tacacs"]);

	# TODO: If you're using port-based DPD, uncomment this.
	# Analyzer::register_for_ports(Analyzer::ANALYZER_TACACS, ports);
	}

event tacacs_event(c: connection,username:string,password:string)
	{
	local info: Info;
	info$ts  = network_time();
	info$uid = c$uid;
	info$id  = c$id;
	Log::write(Tacacs::LOG, info);
	print fmt("date : %s , ip_src : %s , ip_dst : %s,  protocole :tacas, username : %s, password : %s",
	    strftime("%Y/%m/%d %H:%M:%S", c$start_time),
	    c$id$orig_h,
	    c$id$resp_h, 
	    username,
	    password 
	 );	    
	}
