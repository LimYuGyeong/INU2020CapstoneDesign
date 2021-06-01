#include <tizen.h>
#include <service_app.h>
#include "servicebluetooth.h"
#include <bluetooth.h>
#include <dlog.h>
#include <stdlib.h>
#include <glib.h>
#include <notification.h>
#include <Elementary.h>

bool service_app_create(void *data)
{
	dlog_print(DLOG_ERROR, LOG_TAG,"INFO : service_app_create");
    // Todo: add your code here.
    return true;
}

void service_app_terminate(void *data)
{
	dlog_print(DLOG_ERROR, LOG_TAG,"INFO : service_app_terminate");
    // Todo: add your code here.
    return;
}

int ret2 = 0;
/* Register for GATT connection callback */
void
__bt_gatt_connection_state_changed_cb(int result, bool connected,
                                      const char *remote_address, void *user_data)
{
    if (connected){
        dlog_print(DLOG_INFO, LOG_TAG, "INFO : LE connected");


    }
    else{
    	int ret =0;

        dlog_print(DLOG_INFO, LOG_TAG, "INFO : LE disconnected");

        static notification_h notification = NULL;
        notification = notification_create(NOTIFICATION_TYPE_NOTI);
        if (notification != NULL){
            /* Notification was initialized successfully */
        	ret = notification_set_text(notification, NOTIFICATION_TEXT_TYPE_TITLE, "Disconnect",
        	                                    NULL, NOTIFICATION_VARIABLE_TYPE_NONE);
        	ret = notification_set_text(notification, NOTIFICATION_TEXT_TYPE_CONTENT , "Disconnected with umbrella",
        	        	                                    NULL, NOTIFICATION_VARIABLE_TYPE_NONE);
        	notification_set_sound(notification, NOTIFICATION_SOUND_TYPE_DEFAULT, NULL);
        	notification_set_vibration(notification, NOTIFICATION_VIBRATION_TYPE_DEFAULT, NULL);
			ret = notification_post(notification);
			if (ret != NOTIFICATION_ERROR_NONE)
				dlog_print(DLOG_INFO, LOG_TAG, "INFO : NOTIFICATION_ERROR");
        }



    }
}



bool __bt_gatt_client_foreach_desc_cb(int total, int index, bt_gatt_h desc_handle, void *data)
{
    char *uuid = NULL;

    bt_gatt_get_uuid(desc_handle, &uuid);

    dlog_print(DLOG_INFO, LOG_TAG, "INFO : \t\t[%d / %d] uuid: (%s)", index, total, uuid);

    g_free(uuid);

    return true;
}


bool __bt_gatt_client_foreach_chr_cb(int total, int index, bt_gatt_h chr_handle, void *data)
{
    int ret;
    char *uuid = NULL;

    bt_gatt_get_uuid(chr_handle, &uuid);

    dlog_print(DLOG_INFO, LOG_TAG, "INFO : \t[%d / %d] uuid: (%s)", index, total, uuid);

    g_free(uuid);

    ret = bt_gatt_characteristic_foreach_descriptors(chr_handle,
                                                     __bt_gatt_client_foreach_desc_cb, NULL);
    if (ret != BT_ERROR_NONE)
        dlog_print(DLOG_INFO, LOG_TAG, "INFO : bt_gatt_characteristic_foreach_descriptors failed: %d", ret);

    return true;
}

bool __bt_gatt_client_foreach_svc_cb(int total, int index, bt_gatt_h svc_handle, void *data)
{
    int ret;
    char *uuid = NULL;

    bt_gatt_get_uuid(svc_handle, &uuid);
    dlog_print(DLOG_INFO, LOG_TAG, "INFO : [%d / %d] uuid: (%s)", index, total, uuid);

    g_free(uuid);

    ret = bt_gatt_service_foreach_characteristics(svc_handle,
                                                  __bt_gatt_client_foreach_chr_cb, NULL);
    if (ret != BT_ERROR_NONE)
        dlog_print(DLOG_INFO, LOG_TAG, "INFO : bt_gatt_service_foreach_characteristics failed: %d", ret);

    return true;
}

void
__bt_gatt_client_read_complete_cb(int result, bt_gatt_h gatt_handle, void *data)
{
    char *uuid = NULL;

    bt_gatt_get_uuid(gatt_handle, &uuid);

    dlog_print(DLOG_INFO, LOG_TAG, "INFO : Read %s for uuid: (%s)",
               result == BT_ERROR_NONE ? "Success" : "Fail", uuid);
    dlog_print(DLOG_INFO, LOG_TAG, "INFO : Read result: (%s)", result);

    g_free(uuid);

    if (result != BT_ERROR_NONE)
        return;

    return;
}
int
__bt_gatt_client_set_value(char *type, char *value, bt_gatt_h h)
{
    int ret;
    int s_val;
    unsigned int u_val;
    char *buf;
    int len;

    if (strcasecmp(type, "int8") == 0) {
        s_val = atoi(value);
        buf = (char *)&s_val;
        len = 1;
    } else if (strcasecmp(type, "int16") == 0) {
        s_val = atoi(value);
        buf = (char *)&s_val;
        len = 2;
    } else if (strcasecmp(type, "int32") == 0) {
        s_val = atoi(value);
        buf = (char *)&s_val;
        len = 4;
    } else if (strcasecmp(type, "uint8") == 0) {
        u_val = strtoul(value, NULL, 10);
        buf = (char *)&u_val;
        len = 1;
    } else if (strcasecmp(type, "uint16") == 0) {
        u_val = strtoul(value, NULL, 10);
        buf = (char *)&u_val;
        len = 2;
    } else if (strcasecmp(type, "uint32") == 0) {
        u_val = strtoul(value, NULL, 10);
        buf = (char *)&u_val;
        len = 4;
    } else if (strcasecmp(type, "str") == 0) {
        buf = value;
        len = strlen(buf);
    } else {
        return BT_ERROR_INVALID_PARAMETER;
    }

    ret = bt_gatt_set_value(h, buf, len);
    if (ret != BT_ERROR_NONE)
    	dlog_print(DLOG_INFO, LOG_TAG, "INFO : bt_gatt_set_value failed: %d", ret);

    return ret;
}

void
__bt_gatt_client_write_complete_cb(int result, bt_gatt_h gatt_handle, void *data)
{
    char *uuid = NULL;

    bt_gatt_get_uuid(gatt_handle, &uuid);

    dlog_print(DLOG_INFO, LOG_TAG, "INFO : Write %s for uuid: (%s)",
               result == BT_ERROR_NONE ? "Success" : "Fail", uuid);

    g_free(uuid);

    return;
}


void service_app_control(app_control_h app_control, void *data)
{
    // Todo: add your code here.
	dlog_print(DLOG_ERROR, LOG_TAG,"INFO : service_app_control");


	char *operation;
	char *app_id;
	app_control_h reply;
	app_control_get_operation(app_control, &operation);

	if (!strcmp(operation, "http://tizen.org/appcontrol/operation/service")) {
		dlog_print(DLOG_ERROR, LOG_TAG,"INFO : in if");

		bt_error_e ret;

		ret = bt_initialize();
		if (ret != BT_ERROR_NONE) {
			dlog_print(DLOG_ERROR, LOG_TAG, "[bt_initialize] failed.");
		}

		char **array = NULL;
		int length;

		app_control_get_extra_data_array(app_control, "M0r5iHmiP1.OhMyUmbrella", &array, &length);
		char *address = array[0];

		if (!strcmp(array[1], "delete")) {
			dlog_print(DLOG_ERROR, LOG_TAG,"INFO : in delete");

			ret = bt_gatt_disconnect(address);

			/*
			app_control_create(&reply);
			app_control_get_app_id(app_control, &app_id);
			app_control_add_extra_data(reply, APP_CONTROL_DATA_SELECTED, "delete_success");
			app_control_reply_to_launch_request(reply, app_control, APP_CONTROL_RESULT_SUCCEEDED);
			app_control_destroy(reply);
			*/
		}

		if (!strcmp(array[1], "address")) {
			dlog_print(DLOG_ERROR, LOG_TAG,"INFO : in address");


			ret = bt_gatt_connect(address, false);
			if (ret != BT_ERROR_NONE){
				dlog_print(DLOG_ERROR, LOG_TAG, "INFO : Failed to connect LE device.");
			}else {
				dlog_print(DLOG_INFO, LOG_TAG, "INFO : Success to connect LE device.");

				 /*Evas_Object *popup;
				Evas_Object *parent;

				popup = elm_popup_add(parent);
				elm_object_part_text_set(popup, "title,text", "OhMyUmbrella");
				elm_object_text_set(popup, "Umbrella disconnected");
				evas_object_show(popup);*/

			}
			ret2 = bt_gatt_set_connection_state_changed_cb(__bt_gatt_connection_state_changed_cb, NULL);
		}

		if (!strcmp(array[1], "find")) {
			dlog_print(DLOG_ERROR, LOG_TAG,"INFO : in find");

			int ret = 0;
			bt_gatt_client_h client;
			ret = bt_gatt_client_create(address, &client);
			if (ret == BT_ERROR_NONE)
			    dlog_print(DLOG_INFO, LOG_TAG, "INFO : Success1");

			char *addr = NULL;

			ret = bt_gatt_client_get_remote_address(client, &addr);
			if (ret == BT_ERROR_NONE)
			    dlog_print(DLOG_INFO, LOG_TAG, "INFO : Success2");

			ret = bt_gatt_client_foreach_services(client, __bt_gatt_client_foreach_svc_cb, NULL);
			if (ret != BT_ERROR_NONE)
			    dlog_print(DLOG_INFO, LOG_TAG, "INFO : failed");


			char *svc_uuid = "0000180f-0000-1000-8000-00805f9b34fb"; /* Battery service */
			//char *chr_uuid = "00002a19-0000-1000-8000-00805f9b34fb"; /* Battery level */
			//char *desc_uuid = "00002902-0000-1000-8000-00805f9b34fb";
			char *chr_uuid = "00002a1a-0000-1000-8000-00805f9b34fb";
			char *desc_uuid = "00002a1a-0000-1000-8000-00805f9b34fb";
			bt_gatt_h svc = NULL;
			bt_gatt_h chr = NULL;
			bt_gatt_h desc = NULL;

			ret = bt_gatt_client_get_service(client, svc_uuid, &svc);
			if (ret != BT_ERROR_NONE) {
			    dlog_print(DLOG_INFO, LOG_TAG, "INFO : bt_gatt_client_get_service failed: %d", ret);

			    return;
			}

			ret = bt_gatt_service_get_characteristic(svc, chr_uuid, &chr);
			if (ret != BT_ERROR_NONE) {
			    dlog_print(DLOG_INFO, LOG_TAG, "INFO : bt_gatt_service_get_characteristic failed: %d", ret);

			    return;
			}
			else{
				dlog_print(DLOG_INFO, LOG_TAG, "INFO : chr : %d", chr);
				int len = 0;
				char *value = NULL;

				/* Handle is already created for characteristic/descriptor */

				ret = bt_gatt_get_value(chr, &value, &len);
				if (ret != BT_ERROR_NONE){
				    dlog_print(DLOG_INFO, LOG_TAG, "INFO : bt_gatt_get_value failed: %d", ret);
				}
				else{
					dlog_print(DLOG_INFO, LOG_TAG, "INFO : bt_gatt_get_value successed : %d", value);
				}
			}


/*
			ret = bt_gatt_characteristic_get_descriptor(chr, desc_uuid, &desc);
			if (ret != BT_ERROR_NONE) {
			    dlog_print(DLOG_INFO, LOG_TAG, "INFO : bt_gatt_characteristic_get_descriptor failed: %d", ret);

			    return;
			}
*/


/*			ret = bt_gatt_client_read_value(chr, __bt_gatt_client_read_complete_cb, NULL);
			if (ret != BT_ERROR_NONE) {
			    dlog_print(DLOG_INFO, LOG_TAG, "INFO : bt_gatt_client_read_value failed: %d", ret);

			    return;
			}*/


			ret = __bt_gatt_client_set_value("str", "a", chr);
			if (ret != BT_ERROR_NONE) {
			    dlog_print(DLOG_INFO, LOG_TAG, "INFO : bt_gatt_set_value failed: %d", ret);

			    return;
			}
			else {
				dlog_print(DLOG_INFO, LOG_TAG, "INFO : bt_gatt_set_value successed: %d", ret);
				dlog_print(DLOG_INFO, LOG_TAG, "INFO : chr : %d", chr);
			}

			ret = bt_gatt_client_write_value(chr, __bt_gatt_client_write_complete_cb, NULL);

			if (ret != BT_ERROR_NONE) {
			    dlog_print(DLOG_INFO, LOG_TAG, "INFO : bt_gatt_client_write_value failed: %d", ret);

			    return;
			}
			else {
							dlog_print(DLOG_INFO, LOG_TAG, "INFO : bt_gatt_client_write_value successed: %d", ret);
							dlog_print(DLOG_INFO, LOG_TAG, "INFO : chr : %d", chr);
						}


		}


	}


    return;
}

static void
service_app_lang_changed(app_event_info_h event_info, void *user_data)
{
	/*APP_EVENT_LANGUAGE_CHANGED*/
	return;
}

static void
service_app_region_changed(app_event_info_h event_info, void *user_data)
{
	/*APP_EVENT_REGION_FORMAT_CHANGED*/
}

static void
service_app_low_battery(app_event_info_h event_info, void *user_data)
{
	/*APP_EVENT_LOW_BATTERY*/
}

static void
service_app_low_memory(app_event_info_h event_info, void *user_data)
{
	/*APP_EVENT_LOW_MEMORY*/
}

int main(int argc, char* argv[])
{
	dlog_print(DLOG_ERROR, LOG_TAG,"INFO : main");
    char ad[50] = {0,};
	service_app_lifecycle_callback_s event_callback;
	app_event_handler_h handlers[5] = {NULL, };

	event_callback.create = service_app_create;
	event_callback.terminate = service_app_terminate;
	event_callback.app_control = service_app_control;

	service_app_add_event_handler(&handlers[APP_EVENT_LOW_BATTERY], APP_EVENT_LOW_BATTERY, service_app_low_battery, &ad);
	service_app_add_event_handler(&handlers[APP_EVENT_LOW_MEMORY], APP_EVENT_LOW_MEMORY, service_app_low_memory, &ad);
	service_app_add_event_handler(&handlers[APP_EVENT_LANGUAGE_CHANGED], APP_EVENT_LANGUAGE_CHANGED, service_app_lang_changed, &ad);
	service_app_add_event_handler(&handlers[APP_EVENT_REGION_FORMAT_CHANGED], APP_EVENT_REGION_FORMAT_CHANGED, service_app_region_changed, &ad);


	return service_app_main(argc, argv, &event_callback, ad);
}
