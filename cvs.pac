# Generated by binpac_quickstart

# Analyzer for CVS
#  - cvs-protocol.pac: describes the CVS protocol messages
#  - cvs-analyzer.pac: describes the CVS analyzer code

%include binpac.pac
%include bro.pac

%extern{
	#include "events.bif.h"
%}

analyzer CVS withcontext {
	connection: CVS_Conn;
	flow:       CVS_Flow;
};

# Our connection consists of two flows, one in each direction.
connection CVS_Conn(bro_analyzer: BroAnalyzer) {
	upflow   = CVS_Flow;
	downflow = CVS_Flow;
};

%include cvs-protocol.pac

# Now we define the flow:
flow CVS_Flow {

	# ## TODO: Determine if you want flowunit or datagram parsing:

	# Using flowunit will cause the anlayzer to buffer incremental input.
	# This is needed for &oneline and &length. If you don't need this, you'll
	# get better performance with datagram.

	# flowunit = CVS_PDU(is_orig) withcontext(connection, this);
	datagram = CVS_PDU withcontext(connection, this);

};

%include cvs-analyzer.pac
