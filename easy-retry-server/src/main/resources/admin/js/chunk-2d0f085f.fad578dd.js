(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0f085f"],{"9d75":function(e,t,a){"use strict";a.r(t);a("b0c0");var r=function(){var e=this,t=e._self._c;return t("a-card",{attrs:{bordered:!1}},[t("div",{staticClass:"table-page-search-wrapper"},[t("a-form",{attrs:{layout:"inline"}},[t("a-row",{attrs:{gutter:48}},[t("a-col",{attrs:{md:8,sm:24}},[t("a-form-item",{attrs:{label:"组名称"}},[t("a-select",{attrs:{placeholder:"请输入组名称"},on:{change:function(t){return e.handleChange(t)}},model:{value:e.queryParam.groupName,callback:function(t){e.$set(e.queryParam,"groupName",t)},expression:"queryParam.groupName"}},e._l(e.groupNameList,(function(a){return t("a-select-option",{key:a,attrs:{value:a}},[e._v(e._s(a))])})),1)],1)],1),t("a-col",{attrs:{md:8,sm:24}},[t("a-form-item",{attrs:{label:"场景名称"}},[t("a-select",{attrs:{placeholder:"请选择场景名称",allowClear:""},model:{value:e.queryParam.sceneName,callback:function(t){e.$set(e.queryParam,"sceneName",t)},expression:"queryParam.sceneName"}},e._l(e.sceneList,(function(a){return t("a-select-option",{key:a.sceneName,attrs:{value:a.sceneName}},[e._v(" "+e._s(a.sceneName))])})),1)],1)],1),t("a-col",{attrs:{md:8,sm:24}},[t("a-form-item",{attrs:{label:"重试状态"}},[t("a-select",{attrs:{placeholder:"请选择状态",allowClear:""},model:{value:e.queryParam.retryStatus,callback:function(t){e.$set(e.queryParam,"retryStatus",t)},expression:"queryParam.retryStatus"}},e._l(e.retryStatus,(function(a,r){return t("a-select-option",{key:r,attrs:{value:r}},[e._v(" "+e._s(a))])})),1)],1)],1),e.advanced?[t("a-col",{attrs:{md:8,sm:24}},[t("a-form-item",{attrs:{label:"业务编号"}},[t("a-input",{attrs:{placeholder:"请输入业务编号",allowClear:""},model:{value:e.queryParam.bizNo,callback:function(t){e.$set(e.queryParam,"bizNo",t)},expression:"queryParam.bizNo"}})],1)],1),t("a-col",{attrs:{md:8,sm:24}},[t("a-form-item",{attrs:{label:"幂等id"}},[t("a-input",{attrs:{placeholder:"请输入幂等id",allowClear:""},model:{value:e.queryParam.idempotentId,callback:function(t){e.$set(e.queryParam,"idempotentId",t)},expression:"queryParam.idempotentId"}})],1)],1),t("a-col",{attrs:{md:8,sm:24}},[t("a-form-item",{attrs:{label:"UniqueId"}},[t("a-input",{attrs:{placeholder:"请输入唯一id",allowClear:""},model:{value:e.queryParam.uniqueId,callback:function(t){e.$set(e.queryParam,"uniqueId",t)},expression:"queryParam.uniqueId"}})],1)],1)]:e._e(),t("a-col",{attrs:{md:e.advanced?24:8,sm:24}},[t("span",{staticClass:"table-page-search-submitButtons",style:e.advanced&&{float:"right",overflow:"hidden"}||{}},[t("a-button",{attrs:{type:"primary"},on:{click:function(t){return e.$refs.table.refresh(!0)}}},[e._v("查询")]),t("a-button",{staticStyle:{"margin-left":"8px"},on:{click:function(){return e.queryParam={}}}},[e._v("重置")]),t("a",{staticStyle:{"margin-left":"8px"},on:{click:e.toggleAdvanced}},[e._v(" "+e._s(e.advanced?"收起":"展开")+" "),t("a-icon",{attrs:{type:e.advanced?"up":"down"}})],1)],1)])],2)],1)],1),t("div",{staticClass:"table-operator"},[t("a-button",{attrs:{type:"primary",icon:"plus"},on:{click:function(t){return e.handleNew()}}},[e._v("新增")]),e.selectedRowKeys.length>0?t("a-dropdown",{directives:[{name:"action",rawName:"v-action:edit",arg:"edit"}]},[t("a-menu",{attrs:{slot:"overlay"},on:{click:e.onClick},slot:"overlay"},[t("a-menu-item",{key:"1"},[t("a-icon",{attrs:{type:"delete"}}),e._v("删除")],1),t("a-menu-item",{key:"2"},[t("a-icon",{attrs:{type:"edit"}}),e._v("更新")],1)],1),t("a-button",{staticStyle:{"margin-left":"8px"}},[e._v(" 批量操作 "),t("a-icon",{attrs:{type:"down"}})],1)],1):e._e()],1),t("s-table",{ref:"table",attrs:{size:"default",rowKey:function(e){return e.id},columns:e.columns,data:e.loadData,alert:e.options.alert,rowSelection:e.options.rowSelection,scroll:{x:2e3}},scopedSlots:e._u([{key:"serial",fn:function(a,r){return t("span",{},[e._v(" "+e._s(r.id)+" ")])}},{key:"taskType",fn:function(a){return t("span",{},[t("a-tag",{attrs:{color:e.taskType[a].color}},[e._v(" "+e._s(e.taskType[a].name)+" ")])],1)}},{key:"retryStatus",fn:function(a){return t("span",{},[t("a-tag",{attrs:{color:e.retryStatus[a].color}},[e._v(" "+e._s(e.retryStatus[a].name)+" ")])],1)}},{key:"action",fn:function(a,r){return t("span",{},[[t("a",{on:{click:function(t){return e.handleInfo(r)}}},[e._v("详情")]),t("a-divider",{attrs:{type:"vertical"}}),0===r.retryStatus?t("a",{on:{click:function(t){return e.handleSuspend(r)}}},[e._v("暂停")]):e._e(),0===r.retryStatus?t("a-divider",{attrs:{type:"vertical"}}):e._e(),3===r.retryStatus?t("a",{on:{click:function(t){return e.handleRecovery(r)}}},[e._v("恢复")]):e._e(),3===r.retryStatus?t("a-divider",{attrs:{type:"vertical"}}):e._e(),1!==r.retryStatus?t("a",{on:{click:function(t){return e.handleFinish(r)}}},[e._v("完成")]):e._e(),1!==r.retryStatus?t("a-divider",{attrs:{type:"vertical"}}):e._e()]],2)}}])}),t("SaveRetryTask",{ref:"saveRetryTask",on:{refreshTable:e.refreshTable}}),t("BatchUpdateRetryTaskInfo",{ref:"batchUpdateRetryTaskInfo",on:{refreshTable:e.refreshTable}})],1)},s=[],o=a("261e"),n=a("27e3"),i=a("0fea"),l=a("2af9"),c=function(){var e=this,t=e._self._c;return t("div",[t("a-modal",{attrs:{visible:e.visible,title:"新增任务",width:"800px"},on:{ok:e.handleOk,cancel:function(t){e.visible=!1}}},[t("a-form",e._b({attrs:{form:e.form},on:{submit:e.handleOk}},"a-form",e.formItemLayout,!1),[t("a-form-item",{attrs:{label:"组"}},[t("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["groupName",{rules:[{required:!0,message:"请选择组"}]}],expression:"['groupName', { rules: [{ required: true, message: '请选择组' }] }]"}],attrs:{placeholder:"请选择组"},on:{change:function(t){return e.handleChange(t)}}},e._l(e.groupNameList,(function(a){return t("a-select-option",{key:a,attrs:{value:a}},[e._v(e._s(a))])})),1)],1),t("a-form-item",{attrs:{label:"场景名称"}},[t("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["sceneName",{rules:[{required:!0,message:"请选择场景名称"}]}],expression:"['sceneName', { rules: [{ required: true, message: '请选择场景名称' }] }]"}],attrs:{placeholder:"请选择场景名称"}},e._l(e.sceneList,(function(a){return t("a-select-option",{key:a.sceneName,attrs:{value:a.sceneName}},[e._v(" "+e._s(a.sceneName))])})),1)],1),t("a-form-item",{attrs:{label:"执行器名称"}},[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["executorName",{rules:[{required:!0,message:"请输入执行器名称"}]}],expression:"['executorName', { rules: [{ required: true, message: '请输入执行器名称' }] }]"}],attrs:{name:"executorName",placeholder:"请输入执行器名称"}})],1),t("a-form-item",{attrs:{label:"幂等ID"}},[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["idempotentId",{rules:[{required:!0,message:"请输入幂等ID"}]}],expression:"['idempotentId', { rules: [{ required: true, message: '请输入幂等ID' }] }]"}],attrs:{name:"idempotentId",placeholder:"请输入幂等ID"}},[t("a-tooltip",{attrs:{slot:"suffix",title:"同一个场景下正在重试中的幂等ID不能重复,若重复的幂等ID在上报时会被幂等处理"},slot:"suffix"},[t("a-icon",{staticStyle:{color:"rgba(0, 0, 0, 0.45)"},attrs:{type:"info-circle"}})],1)],1),t("a-button",{staticStyle:{position:"absolute",margin:"3px 10px"},attrs:{type:"primary"},on:{click:e.idempotentIdGenerate}},[e._v(" 通过客户端生成 ")])],1),t("a-form-item",{attrs:{label:"业务编号"}},[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["bizNo",{rules:[{required:!1,message:"请输入业务编号"}]}],expression:"['bizNo', { rules: [{ required: false, message: '请输入业务编号' }] }]"}],attrs:{name:"bizNo",placeholder:"请输入业务编号"}},[t("a-tooltip",{attrs:{slot:"suffix",title:"具有业务特征的编号比如订单号、物流编号等"},slot:"suffix"},[t("a-icon",{staticStyle:{color:"rgba(0, 0, 0, 0.45)"},attrs:{type:"info-circle"}})],1)],1)],1),t("a-form-item",{attrs:{label:"重试状态"}},[t("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["retryStatus",{rules:[{required:!0,message:"请选择重试状态"}]}],expression:"['retryStatus', { rules: [{ required: true, message: '请选择重试状态' }] }]"}],attrs:{placeholder:"请选择重试状态"}},e._l(e.retryStatus,(function(a,r){return t("a-select-option",{key:r,attrs:{value:r}},[e._v(" "+e._s(a))])})),1)],1),t("a-form-item",{attrs:{label:"参数"}},[t("a-textarea",{directives:[{name:"decorator",rawName:"v-decorator",value:["argsStr",{rules:[{required:!0,message:"请输入参数"}]}],expression:"['argsStr', { rules: [{ required: true, message: '请输入参数' }] }]"}],attrs:{rows:"4",placeholder:"请输入参数"}})],1)],1)],1)],1)},u=[],d={name:"SavRetryTask",props:{},data:function(){return{visible:!1,form:this.$form.createForm(this),formItemLayout:{labelCol:{lg:{span:6},sm:{span:7}},wrapperCol:{lg:{span:14},sm:{span:17}}},groupNameList:[],sceneList:[],retryStatus:{0:"重试中",1:"重试完成",2:"最大次数",3:"暂停"}}},methods:{handleOk:function(e){var t=this;e.preventDefault(),this.form.validateFields((function(e,a){e||Object(i["C"])(a).then((function(e){t.form.resetFields(),t.$message.success("新增任务成功"),t.visible=!1,t.$emit("refreshTable",1)}))}))},handleChange:function(e){var t=this;Object(i["s"])({groupName:e}).then((function(e){t.sceneList=e.data}))},isShow:function(e,t){var a=this;this.visible=e,Object(i["g"])().then((function(e){a.groupNameList=e.data}))},idempotentIdGenerate:function(){var e=this,t=this.form.getFieldValue("groupName"),a=this.form.getFieldValue("sceneName"),r=this.form.getFieldValue("executorName"),s=this.form.getFieldValue("argsStr");Object(i["x"])({groupName:t,sceneName:a,executorName:r,argsStr:s}).then((function(t){e.form.setFieldsValue({idempotentId:t.data})}))}}},m=d,f=a("2877"),p=Object(f["a"])(m,c,u,!1,null,"6547fe2c",null),h=p.exports,v=function(){var e=this,t=e._self._c;return t("div",[t("a-modal",{attrs:{visible:e.visible,title:"批量更新",width:"800px"},on:{ok:e.handleOk,cancel:function(t){e.visible=!1}}},[t("a-form",e._b({attrs:{form:e.form},on:{submit:e.handleOk}},"a-form",e.formItemLayout,!1),[t("a-alert",{attrs:{message:"批量更新只根据选择的数据进行更新, 请操作前确认您的选择的数据是否正确?",banner:""}}),t("a-form-item",{attrs:{label:"执行器名称"}},[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["executorName",{rules:[{required:!1,message:"请输入执行器名称"}]}],expression:"['executorName', { rules: [{ required: false, message: '请输入执行器名称' }] }]"}],attrs:{name:"executorName",placeholder:"请输入执行器名称"}})],1),t("a-form-item",{attrs:{label:"重试状态"}},[t("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["retryStatus",{rules:[{required:!1,message:"请选择重试状态"}]}],expression:"['retryStatus', { rules: [{ required: false, message: '请选择重试状态' }] }]"}],attrs:{placeholder:"请选择重试状态"}},e._l(e.retryStatus,(function(a,r){return t("a-select-option",{key:r,attrs:{value:r}},[e._v(" "+e._s(a))])})),1)],1)],1)],1)],1)},y=[],g={name:"BatchUpdateRetryTaskInfo",props:{},data:function(){return{visible:!1,form:this.$form.createForm(this),formItemLayout:{labelCol:{lg:{span:6},sm:{span:7}},wrapperCol:{lg:{span:14},sm:{span:17}}},groupNameList:[],sceneList:[],retryStatus:{0:"重试中",1:"重试完成",2:"最大次数",3:"暂停"},groupName:"",ids:[]}},methods:{handleOk:function(e){var t=this;e.preventDefault(),this.form.validateFields((function(e,a){if(!e){if(void 0===a["executorName"]&&void 0===a["retryStatus"])return void t.$message.error("无需要更新的内容, 请填写任意一项");a["groupName"]=t.groupName,a["ids"]=t.ids,Object(i["b"])(a).then((function(e){t.$emit("refreshTable",1),t.form.resetFields(),t.$message.success("更新任务成功"),t.visible=!1}))}}))},isShow:function(e,t,a){this.visible=e,this.groupName=t[0].groupName,this.ids=a}}},b=g,N=Object(f["a"])(b,v,y,!1,null,"14d86acc",null),w=N.exports,k={name:"RetryTask",components:{AInput:n["a"],ATextarea:o["a"],STable:l["j"],SaveRetryTask:h,BatchUpdateRetryTaskInfo:w},data:function(){var e=this;return{currentComponet:"List",record:"",mdl:{},visible:!1,advanced:!1,queryParam:{},retryStatus:{0:{name:"处理中",color:"#9c1f1f"},1:{name:"处理成功",color:"#f5a22d"},2:{name:"最大次数",color:"#68a5d0"},3:{name:"暂停",color:"#f52d8e"}},taskType:{1:{name:"重试数据",color:"#d06892"},2:{name:"回调数据",color:"#f5a22d"}},columns:[{title:"ID",scopedSlots:{customRender:"serial"},fixed:"left"},{title:"UniqueId",dataIndex:"uniqueId",width:"10%"},{title:"组名称",dataIndex:"groupName",ellipsis:!0,width:"10%"},{title:"场景名称",dataIndex:"sceneName",width:"10%"},{title:"幂等id",dataIndex:"idempotentId",width:"10%"},{title:"业务编号",dataIndex:"bizNo",width:"10%"},{title:"下次触发时间",dataIndex:"nextTriggerAt",needTotal:!1,width:"10%"},{title:"次数",dataIndex:"retryCount",sorter:!0,width:"6%"},{title:"重试状态",dataIndex:"retryStatus",scopedSlots:{customRender:"retryStatus"},width:"5%"},{title:"任务类型",dataIndex:"taskType",scopedSlots:{customRender:"taskType"},width:"5%"},{title:"更新时间",dataIndex:"updateDt",sorter:!0,width:"10%"},{title:"操作",fixed:"right",dataIndex:"action",width:"150px",scopedSlots:{customRender:"action"}}],loadData:function(t){return Object(i["r"])(Object.assign(t,e.queryParam)).then((function(e){return e}))},selectedRowKeys:[],selectedRows:[],options:{alert:{show:!0,clear:function(){e.selectedRowKeys=[]}},rowSelection:{selectedRowKeys:this.selectedRowKeys,onChange:this.onSelectChange}},optionAlertShow:!1,groupNameList:[],sceneList:[]}},created:function(){var e=this;Object(i["g"])().then((function(t){e.groupNameList=t.data,null!==e.groupNameList&&e.groupNameList.length>0&&(e.queryParam["groupName"]=e.groupNameList[0],e.$refs.table.refresh(!0),e.handleChange(e.groupNameList[0]))}))},methods:{handleNew:function(){this.$refs.saveRetryTask.isShow(!0,null)},handleChange:function(e){var t=this;Object(i["s"])({groupName:e}).then((function(e){t.sceneList=e.data}))},toggleAdvanced:function(){this.advanced=!this.advanced},handleInfo:function(e){this.$router.push({path:"/retry-task/info",query:{id:e.id,groupName:e.groupName}})},handleOk:function(e){},handleSuspend:function(e){var t=this;Object(i["G"])({id:e.id,groupName:e.groupName,retryStatus:3}).then((function(e){var a=e.status;0===a?t.$message.error("暂停失败"):(t.$refs.table.refresh(!0),t.$message.success("暂停成功"))}))},handleRecovery:function(e){var t=this;Object(i["G"])({id:e.id,groupName:e.groupName,retryStatus:0}).then((function(e){var a=e.status;0===a?t.$message.error("恢复失败"):(t.$refs.table.refresh(!0),t.$message.success("恢复成功"))}))},handleFinish:function(e){var t=this;Object(i["G"])({id:e.id,groupName:e.groupName,retryStatus:1}).then((function(e){var a=e.status;0===a?t.$message.error("重试完成失败"):(t.$refs.table.refresh(!0),t.$message.success("重试完成成功"))}))},refreshTable:function(e){this.$refs.table.refresh(!0)},onSelectChange:function(e,t){this.selectedRowKeys=e,this.selectedRows=t},handlerDel:function(){this.$createElement;var e=this;this.$confirm({title:"您要删除这些数据吗?",content:function(e){return e("div",{style:"color:red;"},["删除后数据不可恢复，请确认!"])},onOk:function(){Object(i["a"])({groupName:e.selectedRows[0].groupName,ids:e.selectedRowKeys}).then((function(t){e.$refs.table.refresh(!0),e.$message.success("成功删除".concat(t.data,"条数据")),e.selectedRowKeys=[]}))},onCancel:function(){},class:"test"})},onClick:function(e){var t=e.key;"2"!==t?"1"===t&&this.handlerDel():this.$refs.batchUpdateRetryTaskInfo.isShow(!0,this.selectedRows,this.selectedRowKeys)}}},S=k,x=Object(f["a"])(S,r,s,!1,null,null,null);t["default"]=x.exports}}]);