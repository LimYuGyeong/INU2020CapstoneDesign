package com.cookandroid.ohmyumbrella

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.*
import androidx.appcompat.app.AppCompatActivity


class alarm_setting_activity : AppCompatActivity() {
    lateinit var btnTimeSetting : Button
    lateinit var tvTime : TextView
//    lateinit var hour : String
//    lateinit var minute : String
//    lateinit var hour : Int
//    lateinit var minute : Int
    lateinit var AMPM : String

    override fun onCreate(savedInstanceState: Bundle?){
        super.onCreate(savedInstanceState)
        setContentView(R.layout.alarm_setting)

        btnTimeSetting = findViewById<Button>(R.id.btnTimeSetting)
        tvTime = findViewById<TextView>(R.id.tvTime)

        var btnBackMain3 = findViewById<ImageButton>(R.id.btnBackMain3)
        btnBackMain3.setOnClickListener{
            var intent = Intent(applicationContext,MainActivity::class.java)
            startActivity(intent)
        }

        btnTimeSetting.setOnClickListener {
            var intent = Intent(applicationContext, time_picker_activity::class.java)
            startActivityForResult(intent, 0)
        }

    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == Activity.RESULT_OK){
//            hour = data!!.getIntExtra("hour", 8).toString()
//            minute = data!!.getIntExtra("minute", 30).toString()

            var hour = data!!.getIntExtra("hour", 8)
            var minute = data!!.getIntExtra("minute", 30)

            if (hour < 12){
                AMPM = "AM"
            }
            else if (hour > 12){
                AMPM = "PM"
                hour -= 12
            }
            else{
                AMPM = "PM"
            }
            var txt = AMPM+ " " + hour.toString() + "시 " + minute.toString() +"분"
            tvTime.setText(txt)
        }
    }
}