package com.cookandroid.ohmyumbrella

import android.content.Intent
import android.os.Bundle
import android.widget.ImageButton
import androidx.appcompat.app.AppCompatActivity

class choose_loaction_activity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?){
        super.onCreate(savedInstanceState)
        setContentView(R.layout.choose_location)

        var btnBackMain1 = findViewById<ImageButton>(R.id.btnBackMain1)
        btnBackMain1.setOnClickListener{
            var intent = Intent(applicationContext,MainActivity::class.java)
            startActivity(intent)
        }
    }
}