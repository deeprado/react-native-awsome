package com.awsome.active;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;

import com.awsome.R;

import com.umeng.message.PushAgent;

public class MyActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_my);

        PushAgent.getInstance(this).onAppStart();

    }

    public void goBack(View v) {
        finish();
    }
}
