# Generated by binpac_quickstart

include(BroPlugin)

include_directories(BEFORE ${CMAKE_CURRENT_SOURCE_DIR} ${CMAKE_CURRENT_BINARY_DIR})

bro_plugin_begin(Bro TELNET_)
	bro_plugin_cc(TELNET_.cc Plugin.cc)
	bro_plugin_bif(events.bif)
	bro_plugin_pac(telnet_.pac telnet_-analyzer.pac telnet_-protocol.pac)
bro_plugin_end()