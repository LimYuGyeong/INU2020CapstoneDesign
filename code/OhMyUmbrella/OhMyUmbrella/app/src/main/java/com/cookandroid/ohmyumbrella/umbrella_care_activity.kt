package com.cookandroid.ohmyumbrella

import android.content.Intent
import android.os.Bundle
import android.widget.ImageButton
import androidx.appcompat.app.AppCompatActivity

class umbrella_care_activity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?){
        super.onCreate(savedInstanceState)
        setContentView(R.layout.umbrella_care)
        var btnBackMain2 = findViewById<ImageButton>(R.id.btnBackMain2)
        btnBackMain2.setOnClickListener{
            var intent = Intent(applicationContext,MainActivity::class.java)
            startActivity(intent)
        }

    }
}