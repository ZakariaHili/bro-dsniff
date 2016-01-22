event irc_join_message (c: connection, is_orig: bool, info_list: irc_join_list){


print fmt("date : %s , ip_src : %s , ip_dst : %s,  user information \n:%s ",
                      strftime("%Y/%m/%d %H:%M:%S", c$start_time),
                      c$id$orig_h,
                      c$id$resp_h,info_list);

}
