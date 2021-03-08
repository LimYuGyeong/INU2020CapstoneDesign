package com.cookandroid.ohmyumbrella

import android.content.Intent
import android.os.Bundle
import android.widget.ImageButton
import androidx.appcompat.app.AppCompatActivity

class alarm_setting_activity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?){
        super.onCreate(savedInstanceState)
        setContentView(R.layout.alarm_setting)

        var btnBackMain3 = findViewById<ImageButton>(R.id.btnBackMain3)
        btnBackMain3.setOnClickListener{
            var intent = Intent(applicationContext,MainActivity::class.java)
            startActivity(intent)
        }

    }
}