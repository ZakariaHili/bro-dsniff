// Generated by binpac_quickstart

#ifndef ANALYZER_PROTOCOL_NNTP_NNTP_H
#define ANALYZER_PROTOCOL_NNTP_NNTP_H

#include "events.bif.h"


#include "analyzer/protocol/tcp/TCP.h"

#include "nntp_pac.h"

namespace analyzer { namespace NNTP {

class NNTP_Analyzer

: public tcp::TCP_ApplicationAnalyzer {

public:
	NNTP_Analyzer(Connection* conn);
	virtual ~NNTP_Analyzer();

	// Overriden from Analyzer.
	virtual void Done();
	
	virtual void DeliverStream(int len, const u_char* data, bool orig);
	virtual void Undelivered(uint64 seq, int len, bool orig);

	// Overriden from tcp::TCP_ApplicationAnalyzer.
	virtual void EndpointEOF(bool is_orig);
	

	static analyzer::Analyzer* InstantiateAnalyzer(Connection* conn)
		{ return new NNTP_Analyzer(conn); }

protected:
	binpac::NNTP::NNTP_Conn* interp;
	
	bool had_gap;
	
};

} } // namespace analyzer::* 

#endif