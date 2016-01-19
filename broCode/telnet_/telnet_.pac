# Generated by binpac_quickstart

# Analyzer for TELNET_
#  - telnet_-protocol.pac: describes the telnet_ protocol messages
#  - telnet_-analyzer.pac: describes the telnet_ analyzer code

%include binpac.pac
%include bro.pac

%extern{
	#include "events.bif.h"
%}

analyzer TELNET_ withcontext {
	connection: TELNET__Conn;
	flow:       TELNET__Flow;
};

# Our connection consists of two flows, one in each direction.
connection TELNET__Conn(bro_analyzer: BroAnalyzer) {
	upflow   = TELNET__Flow(true);
	downflow = TELNET__Flow(false);
};

%include telnet_-protocol.pac

# Now we define the flow:
flow TELNET__Flow(is_orig: bool) {

	# ## TODO: Determine if you want flowunit or datagram parsing:

	# Using flowunit will cause the anlayzer to buffer incremental input.
	# This is needed for &oneline and &length. If you don't need this, you'll
	# get better performance with datagram.

	# flowunit = TELNET__PDU(is_orig) withcontext(connection, this);
	datagram = TELNET__PDU(is_orig) withcontext(connection, this);

};

%include telnet_-analyzer.pac