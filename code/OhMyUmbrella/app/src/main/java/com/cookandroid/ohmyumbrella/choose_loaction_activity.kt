package com.cookandroid.ohmyumbrella

import android.content.Intent
import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.ImageButton
import android.widget.Spinner
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

        val spinner1 = findViewById<Spinner>(R.id.spinner1)
        val spinner3 = findViewById<Spinner>(R.id.spinner3)
// Create an ArrayAdapter using the string array and a default spinner layout
        ArrayAdapter.createFromResource(
                this,
                R.array.sido,
                android.R.layout.simple_spinner_item
        ).also { adapter ->
            // Specify the layout to use when the list of choices appears
            adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
            // Apply the adapter to the spinner
            spinner1.adapter = adapter
            spinner3.adapter = adapter
        }

    }
}