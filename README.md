# Approval Workflow

## Server-env

Key-value pair

## Approval Configuration

```bash
src
├── approval
|   ├── <app_name>
|   |   ├── <module_name>.json
|   |   └── <module2_name>.json
|   ├── <app2_name>
|   |   ├── <module_name>.json
```

`{{your_domain}}/approval/{{app_name}}/{{module_name}}/{{approval_id}}`

* `code`      : 
* `title`     : 
* `view`      : 
* `points`    : 
* `action`    : 
* `parameter` : 

### Points

* `code`      : 
* `type`      : 
* `display`   : 
* `next`      : 
* `action`    : 
* `items`     : 

### Action

* `method`    :
* `url`       : `{{ token | url_encode }}`
* `data`      :
