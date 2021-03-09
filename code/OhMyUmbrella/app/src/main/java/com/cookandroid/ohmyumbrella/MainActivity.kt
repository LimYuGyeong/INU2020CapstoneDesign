package com.cookandroid.ohmyumbrella

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.ImageButton

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        var btnLocation = findViewById<ImageButton>(R.id.btnLocation)
        btnLocation.setOnClickListener{
            var intent = Intent(applicationContext,choose_loaction_activity::class.java)
            startActivity(intent)
        }

        var btnAlarm = findViewById<ImageButton>(R.id.btnAlarm)
        btnAlarm.setOnClickListener{
            var intent = Intent(applicationContext,alarm_setting_activity::class.java)
            startActivity(intent)
        }

        var btnCare = findViewById<ImageButton>(R.id.btnCare)
        btnCare.setOnClickListener{
            var intent = Intent(applicationContext,umbrella_care_activity::class.java)
            startActivity(intent)
        }

    }
}