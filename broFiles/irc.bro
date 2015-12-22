global i=-1;
global s=0;
global users : table[int] of string;
global passwords: table[int] of string;
global nicks: table[int] of string;



event irc_join_message (c: connection, is_orig: bool, info_list: irc_join_list){
print fmt("  :%s",info_list
                      );

}

