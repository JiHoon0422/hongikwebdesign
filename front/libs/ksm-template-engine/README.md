ksm-template-engine.js
===

SETP1. 아래와 같은 형태의 JSON이 필요함.
----
```
[
	{
		"link_url":"#",
		"thumb_url":"http://gifpng.com/768x432?background-color=515151&color=ffffff",
		"project_name":"111",
		"project_desc":"#"
	},
	{
		"link_url":"#",
		"thumb_url":"http://gifpng.com/768x432?background-color=515151&color=ffffff",
		"project_name":"222",
		"project_desc":"#"
	}
]
```

SETP2. 아래와 같이 HTML을 작성하면됨.
---
```
<script type="text/html" class="ksm_tpl" src="/json/work_data.json">
	<div class="col-lg-6 portfolio-item">
		<div class="card h-100">
			<a href="{{link_url}}"><img class="card-img-top" src="{{thumb_url}}" alt="" onerror="console.log(this)"></a>
			<div class="card-body">
				<h4 class="card-title">
					<a href="{{link_url}}">{{project_name}}</a>
				</h4>
				<p class="card-text">{{project_desc}}</p>
			</div>
		</div>
	</div>
</script>
```
<br>

ETC. 배열로 템플릿 돌리는 방법
---
```
<script type="text/javascript">
	var ARRAY180730104230=[
		{
			"project_name":"AAA",
			"project_desc":"AAA_DESC"
		},
		{
			"project_name":"BBB",
			"project_desc":"BBB_DESC"
		}
	];
</script>
<script type="text/html" class="ksm_tpl" data-array="ARRAY180730104230">
	<div class="tit0">{{project_name}}</div>
	<div class="txt0">{{project_desc}}</div>
</script>
<!-- // section -->
```



