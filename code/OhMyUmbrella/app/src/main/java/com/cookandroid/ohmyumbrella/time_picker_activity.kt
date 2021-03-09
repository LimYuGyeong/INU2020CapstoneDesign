package com.cookandroid.ohmyumbrella

import android.app.Activity
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.os.PersistableBundle
import android.view.Window
import android.widget.Button
import android.widget.TimePicker
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.FragmentActivity

class time_picker_activity : FragmentActivity(){
    lateinit var tPicker : TimePicker
    lateinit var btnSet : Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.time_picker)

        var outIntent = Intent(applicationContext, alarm_setting_activity::class.java)
        var hour : Int
        var minute : Int
        tPicker = findViewById<TimePicker>(R.id.TimePicker1)
        btnSet = findViewById<Button>(R.id.btnSet)

        btnSet.setOnClickListener {
            if(Build.VERSION.SDK_INT < 23)
            {
                hour = tPicker.getCurrentHour()
                minute = tPicker.getCurrentMinute()
            }

            else
            {
                hour = tPicker.getHour()
                minute = tPicker.getMinute()
            }
            outIntent.putExtra("hour", hour)
            outIntent.putExtra("minute", minute)
            setResult(Activity.RESULT_OK, outIntent)
            finish()
        }

    }
}
